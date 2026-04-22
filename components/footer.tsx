"use client";

import Link from "next/link";
import { Card } from "./ui/card";
import { Nunito } from "next/font/google";
import { AppStoreIcon, CHplayIcon, ExtensionIcon } from "./icons";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["800"],
  variable: "--font-nunito",
});

function FooterLink({ title, url }: { title: string; url: string }) {
  return (
    <Link
      className="block text-(--text-small-secondary) mt-3"
      key={title}
      href={url}
    >
      {title}
    </Link>
  );
}

export function Footer() {
  const information = [
    {
      url: "/",
      title: "Giới thiệu",
    },
    {
      url: "/",
      title: "Chính sách",
    },
    {
      url: "/",
      title: "Điều khoản",
    },
    {
      url: "/",
      title: "Trợ giúp",
    },
  ];

  const terms = [
    {
      url: "/",
      title: "Hướng dẫn mua hàng trực tuyến",
    },
    {
      url: "/",
      title: "Chính sách thanh toán",
    },
    {
      url: "/",
      title: "Chính sách kiểm hàng",
    },
    {
      url: "/",
      title: "Chính sách bảo mật thông tin cá nhân",
    },
    {
      url: "/",
      title: "Chính sách vận chuyển, giao nhận",
    },
    {
      url: "/",
      title: "Quy trình tiếp nhận và khiếu nại",
    },
    {
      url: "/",
      title: "Chính sách đổi trả, hoàn tiền",
    },
  ];

  const socials = [
    {
      title: "facebook",
      url: "/",
      image: "/images/facebook.png",
    },
    {
      title: "instagram",
      url: "/",
      image: "/images/instagram.png",
    },
    {
      title: "tiktok",
      url: "/",
      image: "/images/tiktok.png",
    },
    {
      title: "zalo",
      url: "/",
      image: "/images/zalo.png",
    },
  ];

  const appDictionarys = [
    {
      title: "mazii",
      url: "/",
      image: "/images/ic_mazii.png",
    },
    {
      title: "faztaa",
      url: "/",
      image: "/images/faztaa.png",
    },
    {
      title: "dunno",
      url: "/",
      image: "/images/dunno.jpg",
    },
  ];

  const appTodaiis = [
    {
      title: "todaii_english",
      url: "/",
      image: "/images/todaii_english.png",
    },
    {
      title: "todaii_german",
      url: "/",
      image: "/images/todaii_german.png",
    },
    {
      title: "todaii_japanese",
      url: "/",
      image: "/images/todaii_japanese.png",
    },
    {
      title: "todaiichinese",
      url: "/",
      image: "/images/todaiichinese40x40.webp",
    },
  ];
  return (
    <footer className="mt-12 pb-12">
      <Card className="ring-0 p-4 grid grid-cols-4 container mx-auto">
        <div>
          <div className="flex items-center gap-3">
            <img className="w-14 h-14" src="/images/logo.png" alt="Logo" />
            <div>
              <h3
                className={
                  nunito.variable +
                  ` font-(family-name:--font-nunito) font-extrabold text-3xl`
                }
              >
                Eng
              </h3>
              <div className="text-lg text-(--text-small-secondary) leading-5">
                Từ điển Anh - Việt
              </div>
            </div>
          </div>
          <h3 className="mt-4 font-semibold text-lg">Thông tin</h3>
          {information.map((item) => (
            <FooterLink key={item.title} title={item.title} url={item.url} />
          ))}
        </div>
        <div>
          <h3 className="mt-4 font-semibold text-lg">Chính sách giao dịch</h3>
          {terms.map((item) => (
            <FooterLink key={item.title} title={item.title} url={item.url} />
          ))}
        </div>
        <div>
          <h3 className="mt-4 font-semibold text-lg">Liên hệ</h3>
          <FooterLink title="(+84) 976 696 764" url="/" />
          <FooterLink title="support@hanzii.net" url="/" />
          <div className="flex items-center gap-3 mt-3">
            {socials.map((social) => (
              <Link key={social.title} href={social.url}>
                <img className="w-8" src={social.image} alt={social.title} />
              </Link>
            ))}
          </div>
          <h3 className="mt-4 font-semibold text-lg">Ứng dụng khác</h3>
          <div className="flex items-center gap-3 mt-3">
            {appDictionarys.map((social) => (
              <Link key={social.title} href={social.url}>
                <img
                  className="w-8 rounded"
                  src={social.image}
                  alt={social.title}
                />
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3 mt-3">
            {appTodaiis.map((social) => (
              <Link key={social.title} href={social.url}>
                <img className="w-8" src={social.image} alt={social.title} />
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mt-4 font-semibold text-lg">Tải ngay</h3>
          <Link className="mt-3 block" href="/">
            <CHplayIcon className="w-40.5 h-12" />
          </Link>
          <Link className="mt-3 block" href="/">
            <AppStoreIcon className="w-40.5 h-12" />
          </Link>
          <Link className="mt-3 block" href="/">
            <ExtensionIcon className="w-40.5 h-12" />
          </Link>
        </div>
      </Card>
    </footer>
  );
}
