"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";

import { useNewProductSheet } from "@/hooks/use-new-product-sheet";

import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { productSchema } from "@/components/product-columns";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const schema = productSchema.omit({ id: true });

const newProductMutation = gql`
  mutation AddProduct($title: String!, $size: Int!, $type: ProductType!) {
    addProduct(title: $title, size: $size, type: $type) {
      title
      size
      type
    }
  }
`;

export type FormData = z.infer<typeof schema>;

export const NewProductForm = () => {
  const { close } = useNewProductSheet();
  const [addProduct, { loading: processing }] = useMutation(
    newProductMutation,
    {
      refetchQueries: ["MasterProductsQuery"],
    }
  );

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      size: 1,
      type: "hazardous",
    },
  });

  const onSubmit = async (values: FormData) => {
    await addProduct({
      variables: values,
    });
    close();
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  disabled={processing}
                  placeholder="My product..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Size</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  disabled={processing}
                  {...field}
                  onChange={(e) =>
                    field.onChange(e.target.value ? +e.target.value : 1)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Product type</FormLabel>
              <FormControl>
                <RadioGroup
                  disabled={processing}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="hazardous" />
                    </FormControl>
                    <FormLabel className="font-normal">Hazardous</FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="non_hazardous" />
                    </FormControl>
                    <FormLabel className="font-normal">Non-Hazardous</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={processing} className="w-full bg-blue-500">
          Create
        </Button>
      </form>
    </Form>
  );
};
