import React from "react";
import { Spin, Toast } from "@douyinfe/semi-ui";

export const loading = async (
  title: React.ReactNode = "Loading...",
  processor: () => Promise<any>
) => {
  let hide = null;
  let loading = setTimeout(() => {
    hide = Toast.info({
      content: title,
      icon: <Spin />,
      duration: 300,
    });
  }, 100);
  try {
    return await processor();
  } finally {
    Toast.close(hide);
    clearTimeout(loading);
  }
};
