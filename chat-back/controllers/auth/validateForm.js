const Yup = require("yup");

const formSchema = Yup.object({
  username: Yup.string()
    .required("Username required")
    .min(6, "Username too short")
    .max(28, "Username too long!"),
  password: Yup.string()
    .required("Password required")
    .min(6, "Password too short")
    .max(28, "Password too long!"),
});

const validateForm = (req, res, next) => {
  const formData = req.body;
  formSchema
    .validate(formData)
    .catch(() => {
      res.status(422).send();
    })
    .then((valid) => {
      if (valid) {
        next();
      } else {
        res.status(422).send();
      }
    });
};

module.exports = validateForm;
