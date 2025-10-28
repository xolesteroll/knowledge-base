import { getAllUsers } from "@/db/queries";
import Link from "next/link";

export default async function UsersPage() {
    // Implementation for users page
    const users = await getAllUsers();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Users Page</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id} className="mb-4">
                        <h2 className="text-xl font-semibold">
                            <Link href={`/users/${user.id}`}>
                                {user.firstName} {user.lastName}
                            </Link>
                        </h2>
                        <p>Email: {user.email}</p>
                        <p>Joined: {user.createdAt.toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}