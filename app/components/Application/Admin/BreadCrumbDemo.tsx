import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {  ReactNode } from "react";

interface BreadcrumbData {
  href?: string;
  label: ReactNode;
}

interface BreadcrumbDemoProps {
  breadcrumbData: BreadcrumbData[];
}

export function BreadcrumbDemo({ breadcrumbData }: BreadcrumbDemoProps) {
  if (!breadcrumbData || breadcrumbData.length === 0) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList className="flex items-center">
        {breadcrumbData.map((data, index) => {
          const isLast = index === breadcrumbData.length - 1;
          return (
            <div key={index} className="flex items-center">
              <BreadcrumbItem>
                {isLast ? (
                  <span className="text-gray-500">{data.label}</span>
                ) : (
                  <BreadcrumbLink href={data.href}>{data.label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator className="ms-2 mt-1" />}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
