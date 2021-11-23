(function () {
  var calendarDate = {};
  var riliHtml = '';
  calendarDate.today = new Date();
  calendarDate.year = calendarDate.today.getFullYear();
  calendarDate.month = calendarDate.today.getMonth() + 1;
  calendarDate.date = calendarDate.today.getDate();
  calendarDate.day = calendarDate.today.getDay();
  function getIndexDay() {
    isLeapYear();
    getDays();
    riliHtml = '';
    calendarDate.monthStart = new Date(calendarDate.year + "/" + calendarDate.month + "/1").getDay();
    console.log(calendarDate)
    if (calendarDate.monthStart == 0) {
      calendarDate.monthStart = 7;
    }
    for (var i = calendarDate.monthStart; i > 0; i--) {
      var dataDateStr = calendarDate.lastYear + "-" + calendarDate.lastMonth + "-" + (calendarDate.lastDays - i + 1);
      riliHtml += '<div class="ht-rili-td ht-rili-td-disabled" data-date="' + dataDateStr + '"><span class="ht-rili-day">' + (calendarDate.lastDays - i + 1) + '</span></div>'
    }
    for (var k = 0; k < calendarDate.days; k++) {
      var dataDateStr = calendarDate.year + "-" + calendarDate.month + "-" + (k + 1);
      if(calendarDate.opt.data.length!=0){
        var flag
        for (var d in calendarDate.opt.data) {
          var nowDate = dataDateStr;
          var dataDate = calendarDate.opt.data[d].date;
          flag = checkDate(nowDate, dataDate);
          if (flag) {
            riliHtml += '<div class="ht-rili-td ht-rili-onclick" data-date="' + dataDateStr + '"><span class="ht-rili-day">' + (k + 1) + '</span><span class="ht-rili-money" data-money="' + calendarDate.opt.data[d].data + '"><b></b></span></div>';
            break;
          }
        }
        if (!flag) {
          riliHtml += '<div class="ht-rili-td ht-rili-td-disabled" data-date="' + dataDateStr + '"><span class="ht-rili-day">' + (k + 1) + '</span><span class="ht-rili-money"></span></div>';
        }
      }else{
        riliHtml += '<div class="ht-rili-td ht-rili-onclick" data-date="' + dataDateStr + '"><span class="ht-rili-day">' + (k + 1) + '</span><span class="ht-rili-money" data-money="1"><b></b></span></div>';
      }

    }
    for (var j = 0; j < (42 - calendarDate.days - calendarDate.monthStart); j++) {
      var dataDateStr = calendarDate.nextYear + "-" + calendarDate.nextMonth + "-" + (j + 1);
      riliHtml += '<div class="ht-rili-td ht-rili-td-disabled" data-date="' + dataDateStr + '"><span class="ht-rili-day">' + (j + 1) + '</span><span class="ht-rili-money" data-money="1"><b></b></span></div>';
    }
    $('.ht-rili-body').append(riliHtml);
    // $('.ht-rili-onclick').on('click', function () {
    //   dateClick(this);
    // })
  }
  function isLeapYear() {
    if ((calendarDate.year % 4 == 0) && (calendarDate.year % 100 != 0 || calendarDate.year % 400 == 0)) {
      calendarDate.isLeapYear = true;
    } else {
      calendarDate.isLeapYear = false;
    }
  }
  function dateClick(obj) {
    $(obj).siblings().each(function () {
      $(this).removeClass('ht-rili-td-active');
    });
    $(obj).addClass('ht-rili-td-active');
  }
  function getDays() {
    if (parseInt(calendarDate.month) == 1) {
      calendarDate.lastDays = new Date(calendarDate.year - 1, 12, 0).getDate();
      calendarDate.lastMonth = new Date(calendarDate.year - 1, 12, 0).getMonth() + 1;
      calendarDate.lastYear = new Date(calendarDate.year - 1, 12, 0).getFullYear();
    } else {
      calendarDate.lastDays = new Date(calendarDate.year, calendarDate.month - 1, 0).getDate();
      calendarDate.lastMonth = new Date(calendarDate.year, calendarDate.month - 1, 0).getMonth() + 1;
      calendarDate.lastYear = new Date(calendarDate.year, calendarDate.month - 1, 0).getFullYear();
    }
    if (parseInt(calendarDate.month) == 12) {
      calendarDate.nextDays = new Date(calendarDate.year + 1, 1, 0).getDate();
      calendarDate.nextMonth = new Date(calendarDate.year + 1, 1, 0).getMonth() + 1;
      calendarDate.nextYear = new Date(calendarDate.year + 1, 1, 0).getFullYear();
    } else {
      calendarDate.nextDays = new Date(calendarDate.year, calendarDate.month + 1, 0).getDate();
      calendarDate.nextMonth = new Date(calendarDate.year, calendarDate.month + 1, 0).getMonth() + 1;
      calendarDate.nextYear = new Date(calendarDate.year, calendarDate.month + 1, 0).getFullYear();
    }
    calendarDate.days = new Date(calendarDate.year, calendarDate.month, 0).getDate();
  }
  function checkDate(dateStr1, dateStr2) {
    var date1 = dateStr1.split("-");
    var date2 = dateStr2.split("-");
    if (date1[1] < 10 && date1[1].length < 2) {
      date1[1] = "0" + date1[1];
    }
    if (date1[2] < 10 && date1[2].length < 2) {
      date1[2] = "0" + date1[2];
    }
    if (date2[1] < 10 && date2[1].length < 2) {
      date2[1] = "0" + date2[1];
    }
    if (date2[2] < 10 && date2[2].length < 2) {
      date2[2] = "0" + date2[2];
    }
    date1 = date1.join("-");
    date2 = date2.join("-");
    return date1 == date2;
  }
  $.fn.extend({
    calendar: function (opt) {
      if ((opt.beginDate != undefined && opt.endDate != undefined) || (opt.data.length > 0)) {
        var beginDate = opt.data.length != 0 ? opt.data[0].date : opt.beginDate;
        var endDate = opt.data.length != 0 ? opt.data[opt.data.length - 1].date : opt.endDate;
        calendarDate.beginYear = parseInt(beginDate.split('-')[0]);
        calendarDate.beginMonth = parseInt(beginDate.split('-')[1]);
        calendarDate.beginDate = parseInt(beginDate.split('-')[2]);
        calendarDate.endYear = parseInt(endDate.split('-')[0]);
        calendarDate.endMonth = parseInt(endDate.split('-')[1]);
        calendarDate.endDate = parseInt(endDate.split('-')[2]);
        calendarDate.year = parseInt(beginDate.split('-')[0]);
        calendarDate.month = parseInt(beginDate.split('-')[1]);
        calendarDate.date = parseInt(beginDate.split('-')[2]);
        calendarDate.opt = opt;
      } else {
        console.log('未传入beginDate或endDate！');
      }
      calendarDate.container = '<div class="ht-rili-querybox"><strong class="ht-rili-title">' + opt.title + '</strong><div class="ht-rili-datebox"><span class="ht-rili-leftarr"></span><span class="ht-rili-date"></span><span class="ht-rili-rightarr"></span></div></div><div class="ht-rili-head"><div class="ht-rili-th">日</div><div class="ht-rili-th">一</div><div class="ht-rili-th">二</div><div class="ht-rili-th">三</div><div class="ht-rili-th">四</div><div class="ht-rili-th">五</div><div class="ht-rili-th">六</div></div><div class="ht-rili-body"><!--<div class="ht-rili-td"><span class="ht-rili-day">1</span><span class="ht-rili-money">&yen;100</span></div>--></div>'
      $(opt.ele).append(calendarDate.container);
      $('.ht-rili-date').html(calendarDate.year + '年 ' + calendarDate.month + '月');
      getIndexDay();
      // $('.ht-rili-leftarr').on('click', function () {
      //   $('.ht-rili-body').html('');
      //   if (calendarDate.month == 1) {
      //     calendarDate.year -= 1;
      //     calendarDate.month = 12;
      //   } else {
      //     calendarDate.month -= 1;
      //   }
      //   $('.ht-rili-date').html(calendarDate.year + '年 ' + calendarDate.month + '月');
      //   getIndexDay();
      // })
      // $('.ht-rili-rightarr').on('click', function () {
      //   $('.ht-rili-body').html('');
      //   if (calendarDate.month == 12) {
      //     calendarDate.year += 1;
      //     calendarDate.month = 1;
      //   } else {
      //     calendarDate.month += 1;
      //   }
      //   $('.ht-rili-date').html(calendarDate.year + '年 ' + calendarDate.month + '月');
      //   getIndexDay();
      // })

      if(opt.chooseDate != undefined){
        $(opt.ele).find('.ht-rili-onclick').each(function(){
          if($(this).attr('data-date') == opt.chooseDate ){
            dateClick($(this))
          }
        });
      }

      return calendarDate;
    },
    calendarGetActive: function () {
      var activeEle = $(this).find(".ht-rili-td-active");
      var date = activeEle.attr("data-date");
      var money = activeEle.children(".ht-rili-money").attr("data-money");
      return data = {
        date: date,
        money: money
      }
    },

  });
}
)(jQuery)