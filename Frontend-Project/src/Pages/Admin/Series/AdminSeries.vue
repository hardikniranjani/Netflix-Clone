<template>
  <div class="Admin__Home">
    <div class="nav">
      <AdminNavBar />
    </div>
    <AdminSeriesBanner
      :src="src"
      :Name="Series.SeriesName"
      :Description="Series.Description"
      :id="this.id"
      :seriesData="Series"
    />
    <div class="Admin__Series__Body">
      <div class="body_content">
        <h3>Seasons</h3>
        <div class="Series_body_episodeList">
          <AdminSeasionCardList :data="Seasons" />
        </div>
      </div>
    </div>
  </div>
  <div class="Admin_Series_footer"><Footer /></div>
</template>

<script>
import AdminSeasionCardList from "../../../components/Admin/AdminSeasionCardList.vue";
import SeriesApi from "../../../services/series.service";
import AdminNavBar from "../../../components/Admin/AdminNavBar.vue";
import AdminSeriesBanner from "../../../components/Admin/AdminSeriesBanner.vue";
import Footer from "../../../components/Footer.vue";

export default {
  name: "AdminSeries",
  data() {
    return {
      Series: [],
      Seasons: [],
      src: "",
    };
  },
  components: {
    AdminNavBar,
    Footer,
    AdminSeriesBanner,
    AdminSeasionCardList,
  },
  props: {
    id: String,
  },
  async mounted() {
    document.title = `NetflixAdmin - Series`;

    await SeriesApi.findSeriesBySearch({
      queryperam: "_id",
      queryName: `${this.id}`,
    })
      .then((res) => {
        console.log(res, "line-67 seriesPage");
        this.Series = res.data[0];
        this.Seasons = res.data[0].Seasons;
        console.log(this.Seasons);
        this.src = res.data[0].backdrop_path;
      })
      .catch((err) => {
        console.log(err);
        this.$router.replace({ name: "PageNotFound" });
      });
  },
};
</script>

<style>
.table {
  background-color: #141414;
  color: #d2d2d2;
}
.Admin__Home {
  width: 100vw;
  height: 100%;
  overflow-x: hidden;
}

.admin_edit_icon {
  transition: all 0.4s;
}
.admin_edit_icon:hover {
  color: #d81f26;
  cursor: pointer;
}
.Series_body_episodeList {
  display: flex;
  overflow-y: hidden;
  overflow-x: hidden;
  overflow: scroll;
}
.Admin__Series__Body {
  margin-top: 0px;
}
.Admin_SideBar {
  display: flex;
  flex-direction: column;
}
.Admin_SideBar_span {
  text-decoration: none;
  color: inherit;
  text-align: center;
  transition: all 0.4s;
  padding: 10px;
}
.Admin_SideBar_span:hover {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  background-color: #d81f26;
}

.Admin__Home__Sidebar {
  object-fit: contain;
  width: 350px;
  flex: 0.4;
}

.Admin__Home__Content {
  flex: 0.8;
}
.router-link-exact-active {
  color: #fafafa;
  background-color: #d81f26;
}

/* .Admin_footer {
   position:absolute;
   left: 0;
   bottom: -217px;
   bottom:0;
   width: 100vw;
} */
.body_content {
  margin-top: -100px;
}
.Admin_Series_footer {
  margin-top: 70px;
}
</style>