"use client";

import { EmailIcon, InfoCircle, LockIcon, TickCircleSuccessIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { InputGroup } from "@/components/ui/input-group";
import { useUserStore } from "@/lib/stores/userStore";
import { setLocalStore } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu >= 6 ký tự"),
});
type FormData = z.infer<typeof formSchema>;

export default function Page() {
  const setUser = useUserStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Login failed");
        }
        return data;
      })
      .then((res) => {
        toast.success("Đăng nhập thành công", {
          position: "top-right",
          icon: <TickCircleSuccessIcon />
        });
        setUser(res.data.user);
        setLocalStore('inforUser', res.data.user);
        setLocalStore('token', res.data.token);
      })
      .catch((err) => {
        toast.error("Tài khoản hoặc mật khẩu không chính xác", {
          position: "top-right",
          icon: <InfoCircle className="text-(--surface-error-primary)" />
        });
      });
  };

  return (
    <div className="flex w-full items-center justify-center p-6 md:p-10">
      <div className="flex flex-col gap-6 w-full max-w-sm">
        <Card className="ring-0">
          <CardHeader>
            <CardTitle className="font-bold text-xl text-(--text-brand-primary)">
              Đăng nhập
            </CardTitle>
            <CardDescription>
              Nhập email của bạn bên dưới để đăng nhập vào tài khoản
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <InputGroup className="p-2 h-12">
                    <EmailIcon className="text-(--icon-brand-primary) mr-2" />
                    <input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      className="outline-none h-9.5 w-full"
                      required
                      {...register("email")}
                    />
                  </InputGroup>
                </Field>
                <Field>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Quên mật khẩu?
                    </a>
                  </div>
                  <InputGroup className="p-2 h-12">
                    <LockIcon className="text-(--icon-brand-primary) mr-2" />
                    <input
                      id="password"
                      type="password"
                      placeholder="Mật khẩu"
                      className="outline-none h-9.5 w-full"
                      required
                      {...register("password")}
                    />
                  </InputGroup>
                </Field>
                <Field>
                  <Button
                    className="cursor-pointer h-10 bg-(--surface-brand-primary)"
                    type="submit"
                  >
                    Login
                  </Button>
                  <FieldDescription className="text-center">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup">Sign up</Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
