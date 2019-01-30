<template>
<div id="main">
   <div class="demo">
   		<div id="seat-map">
			<div class="front">屏幕</div>					
		</div>
		<div class="booking-details">
			<p>影片：<span>星际穿越</span></p>
			<p>时间：<span>11月14日 21:00</span></p>
			<p>座位：</p>
			<ul id="selected-seats"></ul>
			<p>票数：<span id="counter">0</span></p>
			<p>总计：<b>￥<span id="total">0</span></b></p>
					
			<button class="checkout-button">确定购买</button>
					
			<div id="legend"></div>
		</div>
		<div style="clear:both"></div>
   </div>
</div>

</div>
</template>
<script>
import $ from 'jquery'
// import {init} from '../../src/assets/js/selSeat.js'
export default {
    mounted(){
        this.init()
    },
    methods:{
       init(){ 
    var price = 80; //票价
$(document).ready(function() {
	var $cart = $('#selected-seats'), //座位区
	$counter = $('#counter'), //票数
	$total = $('#total'); //总计金额
	console.dir($('#seat-map'))
	var sc = $('#seat-map').seatCharts({
		map: [  //座位图
		
            '_aaaaaa_aaaaaa_',
			'_aaaaaa_aaaaaa_',
			'_aaaaaa_aaaaaa_',
			'_aaaaaa_aaaaaa_',
			'_aaaaaa_aaaaaa_',
			'_aaaaaa_aaaaaa_',
			'_aaaaaa_aaaaaa_',
		
		    'aaaaaaaaaaaaaaa',
			'aaaaaaaaaaaaaaa'
		],
		naming : {
			top : false,
			getLabel : function (character, row, column) {
				return column;
			}
		},
		legend : { //定义图例
			node : $('#legend'),
			items : [
				[ 'a', 'available',   '可选座' ],
				[ 'a', 'unavailable', '已售出']
			]					
		},
		click: function () { //点击事件
			if (this.status() == 'available') { //可选座
				$('<li>'+(this.settings.row+1)+'排'+this.settings.label+'座</li>')
					.attr('id', 'cart-item-'+this.settings.id)
					.data('seatId', this.settings.id)
					.appendTo($cart);

				$counter.text(sc.find('selected').length+1);
				$total.text(recalculateTotal(sc)+price);
							
				return 'selected';
			} else if (this.status() == 'selected') { //已选中
					//更新数量
					$counter.text(sc.find('selected').length-1);
					//更新总计
					$total.text(recalculateTotal(sc)-price);
						
					//删除已预订座位
					$('#cart-item-'+this.settings.id).remove();
					//可选座
					return 'available';
			} else if (this.status() == 'unavailable') { //已售出
				return 'unavailable';
			} else {
				return this.style();
			}
		}
	});
	//已售出的座位
	var arr=['8_5','8_6']
	sc.get(arr).status('unavailable');
		
});
//计算总金额
function recalculateTotal(sc) {
	var total = 0;
	sc.find('selected').each(function () {
		total += price;
	});
			
	return total;
}

 }
    }

}
</script>
<style lang="scss">
 @import  '../../src/assets/css/selSeat.css'
</style>
