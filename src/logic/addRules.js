import { extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import en from "vee-validate/dist/locale/en";

function validateVideoUrl(url) {
  let re = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
  return re.test(url);
}

export default () => {
  extend("youtubeUrl", {
    validate: value => validateVideoUrl(value),
    message: "This is not a valid YouTube URL."
  });
  extend('required', {
    ...required,
    message: en.messages['required']
  });
};
