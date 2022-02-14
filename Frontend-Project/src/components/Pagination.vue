<template>
  <nav aria-label="...">
    <ul class="pagination">
      <li
        class="page-item"
        :class="[currentPageIndex == pageNumbers[0] ? 'disabled' : '']"
        @click="previousPage"
      >
        <a class="page-link" href="#" tabindex="-1" aria-disabled="true"
          >Previous</a
        >
      </li>
      <li
        v-for="page in pageNumbers"
        :key="page"
        class="page-item"
        :class="[page == currentPageIndex ? 'active' : '']"
        @click="changePageNumber(page)"
      >
        <a class="page-link" href="#">{{ page }}</a>
      </li>

      <li
        class="page-item"
        :class="[
          currentPageIndex == pageNumbers[this.pageNumbers.length - 1]
            ? 'disabled'
            : '',
        ]"
        @click="nextPage"
      >
        <a class="page-link" href="#">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    pageNumbers: {
      type: Array,
    },
    currentPageIndex : {
          type : Number,
          required : true,
          default : 1
    }
  },
  methods: {

    changePageNumber(num) {
      this.$emit("changePage", num);
      
    },
    previousPage() {
      if (this.currentPageIndex == this.pageNumbers[0]) return;

      this.changePageNumber(this.currentPageIndex - 1);
    },
    nextPage() {
      if (
        this.currentPageIndex == this.pageNumbers[this.pageNumbers.length - 1]
      ) {
        return;
      }

      this.changePageNumber(this.currentPageIndex + 1);
    },
  }
};
</script>