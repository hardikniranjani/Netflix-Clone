<template>
  <div class="Admin__Home">
    <div class="nav">
      <AdminNavBar />
    </div>
    <AdminSeasionBanner
      :src="src"
      :Name="SeasonData.SeasonName"
      :Description="SeasonData.Description"
      :id="this.seasonId"
      :seasonData="SeasonData"
      :totalEpisode="TotalEpisode"
    />
    <div class="Admin__Series__Body">
      <div class="body_content">
        <h3>Episodes</h3>
        <div class="Series_body_episodeList">
          <AdminEpisodeCardList :data="SeasonData.Episodes" />
        </div>
      </div>
    </div>
  </div>
  <div class="Admin_Series_footer"><Footer /></div>
</template>

<script>
// import SeriesApi from "../../../services/series.service";
import SeasonApi from "../../../services/season.service";
import AdminNavBar from "../../../components/Admin/AdminNavBar.vue";
import AdminEpisodeCardList from "../../../components/Admin/AdminEpisodeCardList.vue";
import AdminSeasionBanner from "../../../components/Admin/AdminSeasionBanner.vue";
import Footer from "../../../components/Footer.vue";

export default {
  name: "AdminSeasion",
  data() {
    return {
      Series: [],
      Seasons: [],
      SeasonData: [],
      TotalEpisode: "",
      src: "",
    };
  },
  components: {
    AdminNavBar,
    Footer,
    AdminSeasionBanner,
    AdminEpisodeCardList,
  },
  props: {
    id: String,
    seasonId: String,
  },
  async mounted() {
    document.title = `NetflixAdmin - Season`;

    await SeasonApi.findseasionBySearch({
      queryperam: "_id",
      queryName: `${this.seasonId}`,
      series_id: `${this.id}`,
    })
      .then((res) => {
        this.SeasonData = res.data[0];
        this.src = res.data[0].Banner;
        this.TotalEpisode = res.data[0].Episodes.length;
      })
      .catch((err) => {
        console.error(err);
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