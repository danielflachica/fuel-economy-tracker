export const numberRules = {
  required: "This field is required",
  validate: (val: string) => {
    if (isNaN(Number(val))) return "Must be a number";
    if (Number(val) <= 0) return "Must be greater than 0";
    return true;
  },
};
