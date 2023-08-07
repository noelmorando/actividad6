import { User } from "./user.interface"

export interface DataUser {
    "page":number
    "per_page":number
    "total":number
    "total_pages":number
    "results":User
}
