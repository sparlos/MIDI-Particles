import { extend } from "vee-validate";

function validateVideoUrl(url) {
  let re = /www\.youtube\.com\/watch\?v=/;
  return re.test(url);
}

export default () => {
  extend("secret", {
    validate: value => validateVideoUrl(value),
    message: "This is not a valid YouTube URL."
  });
};
