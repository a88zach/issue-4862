"use client";
import * as React from "react";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { usePathname, useParams } from "next/navigation";
import { PageContainer } from "@toolpad/core/PageContainer";
import Copyright from "../components/Copyright";
import SidebarFooterAccount, {
  ToolbarAccountOverride,
} from "./SidebarFooterAccount";
import {
  FormControl,
  MenuItem,
  MenuList,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useRouter } from "next/navigation";

function ToolbarActionsOverride() {
  const [account, setAccount] = React.useState("account1");

  const handleChange = (event: SelectChangeEvent) => {
    setAccount(event.target.value);
  };
  return (
    <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
      <Select
        id="demo-select-small"
        value={account}
        label="Account"
        onChange={handleChange}
      >
        <MenuItem value={"account1"}>Account 1</MenuItem>
        <MenuItem value={"account2"}>Account 2</MenuItem>
        <MenuItem value={"account3"}>Account 3</MenuItem>
      </Select>
    </FormControl>
  );
}

function SidebarFooterOverride() {
  const router = useRouter();

  return (
    <MenuList sx={{ mb: 20 }}>
      <MenuItem onClick={() => router.push("/")}>Dashboard</MenuItem>
      <MenuItem onClick={() => router.push("/orders")}>Orders</MenuItem>
      <MenuItem onClick={() => router.push("/employees")}>Employees</MenuItem>
    </MenuList>
  );
}

export default function Layout(props: { children: React.ReactNode }) {
  const pathname = usePathname();
  const params = useParams();
  const [employeeId] = params.segments ?? [];

  const title = React.useMemo(() => {
    if (pathname === "/employees/new") {
      return "New Employee";
    }
    if (employeeId && pathname.includes("/edit")) {
      return `Employee ${employeeId} - Edit`;
    }
    if (employeeId) {
      return `Employee ${employeeId}`;
    }
    return undefined;
  }, [employeeId, pathname]);

  return (
    <DashboardLayout
      slots={{
        toolbarActions: ToolbarActionsOverride,
        toolbarAccount: ToolbarAccountOverride,
        sidebarFooter: SidebarFooterOverride,
      }}
    >
      <PageContainer title={title}>
        {props.children}
        <Copyright sx={{ my: 4 }} />
      </PageContainer>
    </DashboardLayout>
  );
}
