<template>
  <div class="Episode_video">
    <div clss="Episode_video_header d-flex">
      <div class="Episode_video_header_left">
        <i class="bi bi-arrow-bar-left" @click="$router.back()">Back</i>
      </div>
      <div class="Episode_video_header_right">
        Episode
        <select v-model="selected"  @change="changeEvent()" >
          <optgroup v-for="s in Seasons" :key="s._id" :label="s.SeasonName">
            <option v-for="episode in s.Episodes" :value="episode._id" :key="episode._id">
              <router-link
                :to="{
                  name: 'EpisodeVideo',
                  params: {
                    id: episode.SeriesID,
                    episodeid: episode._id,
                    seasonid: episode.SeasonID,
                  },
                }"
              >
                {{ episode.EpisodeName }}
              </router-link>
            </option>
          </optgroup>
        </select>
      </div>
    </div>
    <video style="width: 100vw; height: 100vh" controls :key="this.src">
      <source :src="src" type="video/mp4" />
    </video>
  </div>
</template>

<script>
import EpisodeApi from '../../services/episode.service';
export default {
  name: "EpisodeVideo",
  data() {
    return {
      selected:"",
      Series: [],
      Seasons: [],
      src: "",
    };
  },
  props: {
    id: String,
    episodeid: String,
    seasonid: String,
  },
  methods: {
    getInstance(art) {
      console.log(art);
    },
    changeEvent(){
        console.log(this.selected);
    }
  },
  async mounted() {
    await EpisodeApi.getEpisode(this.id)
      .then((res) => {
      
        console.log(res.data);
        this.src = res.data[0].Video_path;
        console.log(res.data[0].Video_path)
      })
      .catch((err) => {
        console.log(err);
        this.$router.replace({ name: "PageNotFound" });
      });
  },
};
</script>

<style>
.Episode_video {
  width: 100vw;
  height: 100vh;
}
.video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.Episode_video_header {
  display: flex;
}
.Episode_video_header_left {
  display: flex;
  align-items: center;
  position: absolute;
  top: 30px;
  left: 30px;
  color: white;
  cursor: pointer;
  z-index: 2;
}
.Episode_video_header_right {
  display: flex;
  justify-content: right;
  display: flex;
  align-items: center;
  position: absolute;
  top: 30px;
  right: 50px;
  color: white;
  cursor: pointer;
  z-index: 2;
}
</style>