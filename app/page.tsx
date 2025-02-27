import Link from "next/link";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

const routes = [
  { path: "/", name: "Home" },
  { path: "/login", name: "Login" },
  { path: "/signup", name: "Sing Up" },
  { path: "/profile", name: "Profile" },
  { path: "/update", name: "Update Profile" },
];

export default function RoutesTable() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 p-4">
      <Card className="p-6 shadow-xl max-w-6xl w-full mx-auto">
        <h2 className="text-xl font-bold mb-4">Available Routes</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Route Name</TableHead>
              <TableHead>Path</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {routes.map((route, index) => (
              <TableRow key={index}>
                <TableCell>{route.name}</TableCell>
                <TableCell className="text-blue-500">{route.path}</TableCell>
                <TableCell>
                  <Link
                    href={route.path}
                    className="text-white bg-blue-600 px-3 py-1 rounded-md hover:bg-blue-700"
                  >
                    Visit
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
