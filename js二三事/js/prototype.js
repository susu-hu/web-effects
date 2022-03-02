// const gril = {
// 	name: '苏苏',
// 	beauty:function(){
// 		console.log('苏苏很漂亮')
// 	}
// };
// console.log(gril)
// gril.beauty()

// const g1 = {
// 	name: '苏苏',
// };
// const g2 = {
// 	name: '苏苏1',
// };
// console.log(g1, g2)

// function sayBeauty(name) {
// 	return {
// 		name: name,
// 		beauty: function () {
// 			console.log(name + '很漂亮')
// 		}
// 	}
// }
// var g1 = sayBeauty('苏苏1')
// var g2 = sayBeauty('苏苏2')
// console.log(g1, g2)
// g1.beauty()
// g2.beauty()
// console.log(g1.beauty == g2.beauty)


// function beauty(name) {
// 	console.log(name + '很漂亮')
// }
// function sayBeauty(name) {
// 	return {
// 		name: name,
// 		beauty: beauty
// 	}
// }
// var g1 = sayBeauty('苏苏22')
// var g2 = sayBeauty('苏苏344')
// console.log(g1, g2)
// g1.beauty()
// g2.beauty()
// console.log(g1.beauty == g2.beauty)


var beauty = {
	beauty: function (name) {
		console.log(name + '很漂亮')
	},
	study:()=>{
		console.log('学习中')
	}
}
function sayBeauty(name) {
	const obj = Object.create(beauty);
	obj.name = name;
	return obj;
}
var g1 = sayBeauty('苏苏22')
var g2 = sayBeauty('苏苏344')
console.log(g1, g2)

g1.beauty()
g2.beauty()
g1.study()
g2.study()