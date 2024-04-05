//@ts-ignore
import * as spinSqlite from "fermyon:spin/sqlite@2.0.0"

export type sqliteValues = ValueInteger | ValueReal | ValueText | ValueBlob | ValueNull
export type SqliteRowResult = sqliteValues[]
export type ValueInteger = { tag: "integer", val: number }
export type ValueReal = { tag: "real", val: number }
export type ValueText = { tag: "text", val: string }
export type ValueBlob = { tag: "blob", val: Uint8Array }
export type ValueNull = { tag: "null" }

export interface SqliteResult {
    columns: string[]
    rows: SqliteRowResult[]
}

export interface SpinSqliteConnection {
    execute: (statement: string, parameters: sqliteValues[]) => SqliteResult
}

export const Sqlite = {
    open: (label: string): SpinSqliteConnection => {
        return spinSqlite.Connection.open(label)
    },
    openDefault: (): SpinSqliteConnection => {
        return spinSqlite.Connection.open("default")
    }
}

export const valueInteger = (value: number): ValueInteger => {
    return { tag: "integer", val: value }
}

export const valueReal = (value: number): ValueReal => {
    return { tag: "real", val: value }
}

export const valueText = (value: string): ValueText => {
    return { tag: "text", val: value }
}

export const valueBlob = (value: Uint8Array): ValueBlob => {
    return { tag: "blob", val: value }
}

export const valueNull = (): ValueNull => {
    return { tag: "null" }
}