"use client";
import { useStorageUpload } from "@thirdweb-dev/react";

export const useStorage = () => {
  const { mutateAsync: upload } = useStorageUpload();

  const uploadData = async (file: any) => {
    const uploadUrl = await upload({
      data: [file],
      options: { uploadWithGatewayUrl: true },
    });
    return uploadUrl[0];
  };

  return { uploadData };
};
