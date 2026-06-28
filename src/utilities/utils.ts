export const numberRules = {
  required: "This field is required",
  validate: (val: string) => {
    if (isNaN(Number(val))) return "Must be a number";
    if (Number(val) <= 0) return "Must be greater than 0";
    return true;
  },
};

export const ph = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const dec = new Intl.NumberFormat("en-PH", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const num = new Intl.NumberFormat("en-PH");
