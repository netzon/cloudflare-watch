import { CloudflareFilterItem } from "./CloudflareFilterItem";

export interface GetCloudflareFilterItemsResponse {
    result: CloudflareFilterItem[];
    success: boolean;
    errors: any[];
    messages: any[];
}