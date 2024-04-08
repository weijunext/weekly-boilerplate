"use client";

import { Icon } from "@iconify/react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Link,
} from "@nextui-org/react";

export default function DeveloperCard() {
  return (
    <div className="flex h-full  w-full items-start justify-center overflow-scroll mt-12">
      <Card className="my-10 w-[400px]">
        <CardHeader className="relative flex h-[100px] flex-col justify-end overflow-visible bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400">
          <Avatar className="h-20 w-20 translate-y-12" src="/logo.svg" />
        </CardHeader>
        <CardBody>
          <div className="pb-4 pt-6">
            <p className="text-large font-medium">weijunext</p>
            <p className="max-w-[90%] text-small text-default-400">
              @weijunext
            </p>
            <div className="flex gap-2 pb-1 pt-2">
              <Chip variant="flat">前端</Chip>
              <Chip variant="flat">全栈</Chip>
              <Chip variant="flat">AI</Chip>
              <Chip variant="flat">出海</Chip>
            </div>
            <p className="py-2 text-small text-foreground">
              👨‍💻前端🛠️全栈✨AI⛵️出海｜Next.js开源手艺人｜掘金签约作者
            </p>
            <div className="w-full text-center mt-4">
              <Button
                as={Link}
                target="_blank"
                className="group relative h-9 overflow-hidden bg-transparent text-small font-normal"
                color="default"
                endContent={
                  <Icon
                    className="flex-none outline-none transition-transform group-data-[hover=true]:translate-x-0.5 [&>path]:stroke-[2]"
                    icon="solar:arrow-right-linear"
                    width={16}
                  />
                }
                href="https://twitter.com/weijunext/"
                style={{
                  border: "solid 2px transparent",
                  backgroundImage: `linear-gradient(hsl(var(--nextui-background)), hsl(var(--nextui-background))), linear-gradient(to right, #F871A0, #9353D3)`,
                  backgroundOrigin: "border-box",
                  backgroundClip: "padding-box, border-box",
                }}
                variant="bordered"
              >
                Follow My Twitter/X
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
