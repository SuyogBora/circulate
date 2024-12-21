import FeatureCard from "@/components/pages/landing/FeatureCard";
import { buttonVariants, Container } from "@circulate/ui";
import { cn } from "@circulate/utils";
import { ChartSpline, Lock, Mail, Send, Wallet } from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "Password Protection",
    description: "Add a password to your files to ensure only authorized users can access them.",
    icon: <Lock className="text-blue-600" />,
    bgColor: "bg-blue-50 dark:bg-blue-100",
  },
  {
    title: "Direct Email Transfers",
    description: "Easily send files directly to an email address for secure and convenient sharing.",
    icon: <Mail className="text-violet-600" />,
    bgColor: "bg-violet-50 dark:bg-violet-100",
  },
  {
    title: "Paid Download Links",
    description: "Monetize your content by setting a price for downloads, and get paid upfront.",
    icon: <Wallet className="text-green-600" />,
    bgColor: "bg-green-50 dark:bg-green-100",
  },
  {
    title: "Real-Time Analytics",
    description: "Track downloads, revenue, and user engagement with detailed real-time insights.",
    icon: <ChartSpline className="text-orange-600" />,
    bgColor: "bg-orange-50 dark:bg-orange-100",
  },

];

export default async function Home() {
  return (
    <section className="py-10">
      <Container>
        <div className="section-content">
          <div className="max-w-[800px] mx-auto flex flex-col items-center gap-8 text-center">
            <div>
              <h1 className="text-6xl font-bold mb-2 leading-[1.2]">
                Share and Monetize Your Files with Ease
              </h1>
              <p className="text-sm text-muted-foreground leading-[1.6]">
                Transform file sharing into an opportunity. Upload your files, generate secure links, and set your price for downloads. Empower your file-sharing experience with seamless payments, detailed real-time analytics, and robust security. Whether for business or personal use, our platform ensures your content is shared efficiently and profitably.
              </p>
            </div>
            <div className="flex items-center gap-2">
              {
                 true ? null : (
                  <Link href={"/auth/login"} className={cn(buttonVariants({ className: "min-w-[150px] shadow-md" }))}>
                    Login
                  </Link>
                )
              }
              <Link href={"/transfer"} className={cn(buttonVariants({ className: "min-w-[150px] shadow-md", variant: "default" }))}>
                Transfer File Now <span><Send /></span>
              </Link>
            </div>
            <div className="border border-border w-full rounded-md p-5">
              <ul className="grid grid-cols-2 gap-4 mb-4">
                {features.map((feature, index) => (
                  <li key={index}>
                    <FeatureCard
                      title={feature.title}
                      description={feature.description}
                      icon={feature.icon}
                      bgColor={feature.bgColor}
                    />
                  </li>
                ))}
              </ul>
              {/* <div className="">
                <Link href={"/"} className={cn(buttonVariants({ variant: "secondary", size: "sm", className: "text-xs" }))}>Read More <span><CircleChevronRight /></span></Link>
              </div> */}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
