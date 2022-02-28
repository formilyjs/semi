import { action } from "@formily/reactive";
import { Field, Form } from "@formily/core/esm/models";

function checkExsitInFieldDataSource(field: Field) {
  return (
    field.dataSource?.findIndex(
      ({ value }: any) => field.value === value || field.value?.includes(value)
    ) === -1
  );
}

export const useAsyncDataSource =
  (service: (field: Field, form?: Form) => Promise<any>, checkExsit = true) =>
  (field: Field, form?: Form) => {
    field.loading = true;
    service(field, form).then(
      action?.bound?.((data) => {
        field.dataSource = data;
        if (checkExsit && checkExsitInFieldDataSource(field)) {
          field.setValue(undefined);
        }
        field.loading = false;
      })
    );
  };
