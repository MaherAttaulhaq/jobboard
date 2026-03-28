import { Database } from "@sqlitecloud/drivers";
import { drizzle as drizzleProxy } from "drizzle-orm/sqlite-proxy";
import type {
  AsyncBatchRemoteCallback,
  RemoteCallback,
  SqliteRemoteDatabase,
} from "drizzle-orm/sqlite-proxy/driver";
import type { ProxyMigrator } from "drizzle-orm/sqlite-proxy/migrator";

type Rowset = Array<Record<string, unknown>> & {
  columnsNames?: string[];
};

type SQLiteCloudContext = {
  db: SqliteRemoteDatabase<Record<string, unknown>>;
  runQueries: ProxyMigrator;
};

const toPlainRow = (row: Record<string, unknown>) => {
  const plain: Record<string, unknown> = {};
  for (const key of Object.keys(row)) {
    plain[key] = row[key];
  }
  return plain;
};

const toValueRow = (
  row: Record<string, unknown>,
  columnsNames?: string[],
) => {
  if (!columnsNames?.length) {
    return Object.values(row);
  }

  return columnsNames.map((column) => row[column]);
};

const mapRowset = (rowset: Rowset, method: string) => {
  const columnsNames = rowset.columnsNames;
  const mapped = rowset.map((row) =>
    method === "values" ? toValueRow(row, columnsNames) : toPlainRow(row),
  );
  return method === "get" ? mapped[0] : mapped;
};

function createSQLiteCloudContext(connectionString: string): SQLiteCloudContext {
  const database = new Database(connectionString);

  const executeQuery: RemoteCallback = async (sql, params, method) => {
    const result = await database.sql({
      query: sql,
      parameters: params ?? [],
    });

    if (Array.isArray(result)) {
      const rows = mapRowset(result as Rowset, method);
      return { rows };
    }

    if (result == null) {
      return { rows: method === "get" ? undefined : [] };
    }

    return { rows: [], ...result };
  };

  const executeBatch: AsyncBatchRemoteCallback = async (requests) => {
    return Promise.all(
      requests.map((request) =>
        executeQuery(request.sql, request.params ?? [], request.method),
      ),
    );
  };

  const runQueries: ProxyMigrator = async (queries) => {
    for (const query of queries) {
      await database.sql({ query, parameters: [] });
    }
  };

  return {
    db: drizzleProxy(executeQuery, executeBatch),
    runQueries,
  };
}

export function createSQLiteCloudDrizzle(connectionString: string) {
  return createSQLiteCloudContext(connectionString).db;
}

export function createSQLiteCloudConnection(connectionString: string) {
  return createSQLiteCloudContext(connectionString);
}
