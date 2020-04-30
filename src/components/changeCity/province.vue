<template>
  <div>
    <span class="name">按省份选择:</span>
    <m-select
      :list="provinceList"
      title="省份"
      :value="province"
      :showWrapperActive="provinceActive"
      @change_active="changeProvinceActive"
      @change="changeProvince"
      className="province"
    />

    <m-select
      :list="cityList"
      title="城市"
      :value="city"
      :showWrapperActive="cityActive"
      @change_active="changeCityActive"
      @change="changeCity"
      className="city"
      :disabled="cityDisabled"
    />

    <span>直接搜索:</span>
    <el-select
      v-model="searchWord"
      filterable
      remote
      reserve-keyword
      placeholder="请输入关键词"
      :remote-method="remoteMethod"
      :loading="loading"
    >
      <el-option v-for="item in searchList" :key="item" :label="item" :value="item"></el-option>
    </el-select>
  </div>
</template>

<script>
import api from "@/api/index.js";
import MSelect from "./select.vue";
export default {
  data() {
    return {
      provinceList: [],
      cityList: [],
      province: "省份",
      city: "城市",
      provinceActive: false,
      cityDisabled: true,
      cityActive: false,
      searchList: ["哈尔滨", "佳木斯", "牡丹江", "鹤岗"],
      searchWord: "",
      loading: false
      // n:[{"provinceCode":"370000","provinceName":"山东","cityInfoList":[{"id":60,"name":"青岛","pinyin":"qingdao","acronym":"qd","rank":"B","firstChar":"Q"},{"id":81,"name":"淄博","pinyin":"zibo","acronym":"zb","rank":"C","firstChar":"Z"},{"id":96,"name":"济南","pinyin":"jinan","acronym":"jn","rank":"B","firstChar":"J"},{"id":104,"name":"烟台","pinyin":"yantai","acronym":"yt","rank":"C","firstChar":"Y"},{"id":222,"name":"枣庄","pinyin":"zaozhuang","acronym":"zaozhuang","rank":"D","firstChar":"Z"},{"id":223,"name":"东营","pinyin":"dongying","acronym":"dy","rank":"D","firstChar":"D"},{"id":224,"name":"潍坊","pinyin":"weifang","acronym":"wf","rank":"C","firstChar":"W"},{"id":225,"name":"济宁","pinyin":"jining","acronym":"jining","rank":"C","firstChar":"J"},{"id":226,"name":"泰安","pinyin":"taian","acronym":"ta","rank":"D","firstChar":"T"},{"id":227,"name":"威海","pinyin":"weihai","acronym":"weihai","rank":"C","firstChar":"W"},{"id":228,"name":"日照","pinyin":"rizhao","acronym":"rizhao","rank":"D","firstChar":"R"},{"id":229,"name":"莱芜","pinyin":"laiwu","acronym":"lw","rank":"E","firstChar":"L"},{"id":230,"name":"临沂","pinyin":"linyi","acronym":"linyi","rank":"C","firstChar":"L"},{"id":231,"name":"德州","pinyin":"dezhou","acronym":"dz","rank":"D","firstChar":"D"},{"id":232,"name":"聊城","pinyin":"liaocheng","acronym":"lc","rank":"D","firstChar":"L"},{"id":233,"name":"滨州","pinyin":"binzhou","acronym":"bz","rank":"D","firstChar":"B"},{"id":234,"name":"菏泽","pinyin":"heze","acronym":"heze","rank":"D","firstChar":"H"},{"id":453,"name":"兖州","pinyin":"yanzhou","acronym":"yanzhou","rank":"E","firstChar":"Y"},{"id":465,"name":"章丘区","pinyin":"zhangqiuqu","acronym":"zhangqiu","rank":"E","firstChar":"Z"},{"id":492,"name":"龙口","pinyin":"longkou","acronym":"lk","rank":"E","firstChar":"L"},{"id":495,"name":"寿光","pinyin":"shouguang","acronym":"shouguang","rank":"E","firstChar":"S"},{"id":496,"name":"青州","pinyin":"qingzhou","acronym":"qingzhou","rank":"E","firstChar":"Q"},{"id":497,"name":"荣成","pinyin":"rongcheng","acronym":"rc","rank":"E","firstChar":"R"},{"id":498,"name":"文登","pinyin":"wendeng","acronym":"wd","rank":"E","firstChar":"W"},{"id":499,"name":"乳山","pinyin":"rushan","acronym":"rs","rank":"E","firstChar":"R"},{"id":508,"name":"邹平","pinyin":"zouping","acronym":"zp","rank":"F","firstChar":"Z"},{"id":523,"name":"新泰","pinyin":"xintai","acronym":"xintai","rank":"E","firstChar":"X"},{"id":526,"name":"诸城","pinyin":"zhucheng","acronym":"zhucheng","rank":"E","firstChar":"Z"},{"id":527,"name":"昌邑","pinyin":"changyi","acronym":"changyi","rank":"E","firstChar":"C"},{"id":529,"name":"莱州","pinyin":"laizhou","acronym":"laizhou","rank":"E","firstChar":"L"},{"id":537,"name":"临清","pinyin":"linqing","acronym":"lq","rank":"F","firstChar":"L"},{"id":541,"name":"广饶","pinyin":"guangrao","acronym":"gr","rank":"F","firstChar":"G"},{"id":545,"name":"肥城","pinyin":"feicheng","acronym":"fc","rank":"E","firstChar":"F"},{"id":549,"name":"滕州","pinyin":"tengzhou","acronym":"tengzhou","rank":"E","firstChar":"T"},{"id":561,"name":"莱阳","pinyin":"laiyang","acronym":"laiyang","rank":"E","firstChar":"L"},{"id":573,"name":"海阳","pinyin":"haiyang","acronym":"haiyang","rank":"E","firstChar":"H"},{"id":582,"name":"平度","pinyin":"pingdu","acronym":"pd","rank":"E","firstChar":"P"},{"id":583,"name":"胶州","pinyin":"jiaozhou","acronym":"jiaozhou","rank":"E","firstChar":"J"},{"id":586,"name":"招远","pinyin":"zhaoyuan","acronym":"zhaoyuan","rank":"E","firstChar":"Z"},{"id":587,"name":"蓬莱","pinyin":"penglai","acronym":"penglai","rank":"E","firstChar":"P"},{"id":588,"name":"安丘","pinyin":"anqiu","acronym":"aq","rank":"E","firstChar":"A"},{"id":589,"name":"高密","pinyin":"gaomi","acronym":"gm","rank":"E","firstChar":"G"},{"id":608,"name":"禹城","pinyin":"yucheng","acronym":"yucheng","rank":"F","firstChar":"Y"},{"id":611,"name":"乐陵","pinyin":"laoling","acronym":"ll","rank":"F","firstChar":"L"},{"id":620,"name":"莱西","pinyin":"laixi","acronym":"laixi","rank":"F","firstChar":"L"},{"id":664,"name":"即墨","pinyin":"jimo","acronym":"jimo","rank":"E","firstChar":"J"},{"id":727,"name":"齐河","pinyin":"qihe","acronym":"qihe","rank":"F","firstChar":"Q"},{"id":728,"name":"夏津","pinyin":"xiajin","acronym":"xiajin","rank":"F","firstChar":"X"},{"id":737,"name":"昌乐","pinyin":"changlecl","acronym":"changlecl","rank":"F","firstChar":"C"},{"id":738,"name":"东平","pinyin":"dongping","acronym":"dongping","rank":"F","firstChar":"D"},{"id":739,"name":"临朐","pinyin":"linqu","acronym":"linqu","rank":"F","firstChar":"L"},{"id":777,"name":"平原","pinyin":"pingyuan","acronym":"pingyuan","rank":"F","firstChar":"P"},{"id":779,"name":"宁阳","pinyin":"ningyang","acronym":"ningyang","rank":"F","firstChar":"N"},{"id":820,"name":"宁津","pinyin":"ningjinnj","acronym":"ningjinnj","rank":"F","firstChar":"N"},{"id":830,"name":"单县","pinyin":"shanxian","acronym":"shanxian","rank":"F","firstChar":"S"},{"id":834,"name":"邹城","pinyin":"zoucheng","acronym":"zoucheng","rank":"E","firstChar":"Z"},{"id":846,"name":"牟平","pinyin":"muping","acronym":"muping","rank":"F","firstChar":"s",}],
    };
  },
  created() {
    api.getProvinceList().then(res => {
      // console.log(JSON.stringify(res.data.data));
      this.provinceList = res.data.data.map(item => {
        item.name = item.provinceName;
        return item;
      });
      // console.log(this.provinceList);
    });
  },
  methods: {
    changeProvinceActive(flag) {
      this.provinceActive = flag;
      if (flag) {
        this.cityActive = false;
      }
    },
    changeCityActive(flag) {
      this.cityActive = flag;
      if (flag) {
        this.provinceActive = false;
      }
    },
    changeProvince(item) {
      this.province = item.name;
      this.cityDisabled = false;
      this.cityList = item.cityInfoList;
    },
    changeCity(item) {
      this.city = item.name;
      this.$store.dispatch("setPosition", item);
      this.$router.push({ name: "index" });
    },
    remoteMethod(val) {
      // 请求后端接口
      console.log(document.cookie, localStorage);
    }
  },
  components: {
    MSelect
  }
};
</script>

<style>
</style>