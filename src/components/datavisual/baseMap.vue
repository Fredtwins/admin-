<style scoped>
#Map{
	width: 100%;
	height: 100%;
	position: absolute;
	overflow: hidden;
}
</style>


<template>
	<div id="Map"></div>
</template>

<script>
	let baseMap = null;
	let baseLayer = null;
	let map = null;
  let waterNetLayer = null;

  let heightLayer = null;
  let panoramaLayer = null;
  let panoramaLayer1 = null;
  let notionLayer = null;
  let nanhaiFoshanLayer = null;
  let xiqiao_riverLayer = null;
	export default {
		components: {

		},
		data() {
			return {

			}
		},

		mounted() {
/*调用百度地图*/
			let baidu_source = this.getBaiduMap();
			baseLayer = new ol.layer.Tile ({
				source: baidu_source,
				visible: true
			});

      var gaodeMapLayer = new ol.layer.Tile({
        source: new ol.source.XYZ({
          url:'http://webrd03.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8'//高德地图在线
        }),
        projection: 'EPSG:3857'
      })


			baseMap = new ol.Map ({
				target: 'Map',
				layers:[gaodeMapLayer],
				view: new ol.View ({
					//center:  [12568311.249846672,2604056.6796193844],
          //center: ol.proj.transform([112.90065765380861,22.767634336801535],'EPSG:4326','EPSG:3857'),
          center: ol.proj.transform([112.88743972778317,22.867634299770017],'EPSG:4326','EPSG:3857'),
					zoom:12,
					maxZoom: 18,
		            minZoom: 3,
				}),
				controls: ol.control.defaults({
            		attribution: false,
          		}).extend([
          			new ol.control.MousePosition({projection: 'EPSG:4326'} )
          		])
			});
			//console.log(ol.proj.transform([112.5794444,22.77416667],'EPSG:4326','EPSG:3857'))



		},

		methods: {
		    //获取百度地图源
		    getBaiduMap: function () {
          let projection = null;
          let resolutions = [];
          let tilegrid = null;
          let source = null;
          projection = ol.proj.get('EPSG:3857');
          for(var i=0;i<19;i++){
            resolutions[i] = Math.pow(2,18-i);
          }

          tilegrid = new ol.tilegrid.TileGrid({
            origin: [0,0],
            resolutions: resolutions
          })

          source = new ol.source.TileImage ({
            projection: projection,
            tileGrid:tilegrid,
            tileUrlFunction: function (tileCoord, pixelRatio, proj){
              if(!tileCoord){
                return "";
              }
              var z = tileCoord[0];
              var x = tileCoord[1];
              var y = tileCoord[2];
              if(x<0){
                x = "M"+(-x);
              }
              if(y<0){
                y = "M"+(-y);
              }
              return "http://online3.map.bdimg.com/onlinelabel/?qt=tile&x="+x+"&y="+y+"&z="+z+"&styles=pl&udt=20151021&scaler=1&p=1";
            }
          });
          return source;
        },
      //获取地图对象
        getBaseMap: function () {
		        return baseMap;
      },

    }
	}
</script>

