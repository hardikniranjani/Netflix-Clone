export default {
  computed: {
    lengthOfPassword() {
      return (password) => {
        return password["length"] > 10 || password["length"] < 8
          ? "text-danger"
          : "text-success";
      };
    },
    upperCaseOfPassword() {
      let upperCasePattern = /(?=.*[A-Z])/;
      return (password) => {
        return upperCasePattern.test(password) ? "text-success" : "text-danger";
      };
    },
    lowerCaseOfPassoword() {
      let lowerCasePattern = /(?=.*[a-z])/;
      return (password) => {
        return lowerCasePattern.test(password) ? "text-success" : "text-danger";
      };
    },
    digitOfPassword() {
      let digitPattern = /(?=.*\d)/;
      return (password) => {
        return digitPattern.test(password) ? "text-success" : "text-danger";
      };
    },
    specialCharOfPassword() {
      let specialCharPattern = /(?=.*[-+_!@#$%^&*., ?])/;
      return (password) => {
        return specialCharPattern.test(password)
          ? "text-success"
          : "text-danger";
      };
    },
  },
};