"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { areas, districts, prices, types } from "@/constants/constants";
import { SelectType } from "@/constants/types";
import { Dispatch, SetStateAction } from "react";

const FormSchema = z.object({
  MaDVHC: z.string({
    required_error: "Vui lòng chọn địa điểm.",
  }),
  LoaiBDS: z.string({
    required_error: "Vui lòng chọn loại bđs.",
  }),
  DienTich: z.string({
    required_error: "Vui lòng chọn diện tích.",
  }),
  GiaThueTheoThang: z.string({
    required_error: "Vui lòng chọn giá thuê mong muốn.",
  }),
});

interface Props {
  onSelection: Dispatch<SetStateAction<SelectType>>;
}

const SelectForm: React.FC<Props> = ({ onSelection }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      MaDVHC: districts[0].MaDVHC,
      LoaiBDS: types[0],
      DienTich: areas[0],
      GiaThueTheoThang: prices[0],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(JSON.stringify(data, null, 2));
    onSelection((prevState) => {
      return {
        ...prevState,
        ...data,
      };
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="py-8 flex items-start justify-between"
      >
        <FormField
          control={form.control}
          name="MaDVHC"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Địa điểm</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-48 h-7">
                    <SelectValue placeholder="Chọn" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {districts.map((dist, index) => (
                    <SelectItem key={index} value={dist.MaDVHC}>
                      {dist.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="LoaiBDS"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Loại bất động sản</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-48 h-7">
                    <SelectValue placeholder="Chọn" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {types.map((type, index) => (
                    <SelectItem key={index} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="DienTich"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Diện tích</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-48 h-7">
                    <SelectValue placeholder="Chọn" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {areas.map((area, index) => (
                    <SelectItem key={index} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="GiaThueTheoThang"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Giá tiền thuê/tháng</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-48 h-7">
                    <SelectValue placeholder="Chọn" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {prices.map((price, index) => (
                    <SelectItem key={index} value={price}>
                      {price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="my-auto px-5 bg-[#DCAE43] hover:bg-[#DCAE43]/80 border border-[#B28326] font-bold"
        >
          TÌM KIẾM
        </Button>
      </form>
    </Form>
  );
};

export default SelectForm;
