import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { User } from "@/types";

const UserOverview: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <table className="table table-hover">
      <thead>
        <tr className="text-white">
          <th scope="col">{t("login.overview.username")}</th>
          <th scope="col">{t("login.overview.password")}</th>
          <th scope="col">{t("login.overview.role")}</th>
        </tr>
      </thead>
      <tbody>
        <tr className="text-white">
          <td>admin</td>
          <td>Password123</td>
          <td>admin</td>
        </tr>
        <tr className="text-white">
          <td>user</td>
          <td>Password123</td>
          <td>user</td>
        </tr>
        <tr className="text-white">
          <td>worker</td>
          <td>Password123</td>
          <td>worker</td>
        </tr>
        <tr className="text-white">
          <td>guest</td>
          <td>Password123</td>
          <td>guest</td>
        </tr>
      </tbody>
    </table>
  );
};

export default UserOverview;
