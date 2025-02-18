import { Input } from "./form"
import { Layout } from "./layout"

export const Login = () => {
    return (
        <Layout country="FR">
            <h1 class="text-3xl font-bold tracking-tight text-gray-900 mb-8">Login</h1>
            <form action='/login' method='post' class='flex flex-col gap-4'>
                <Input name="email" id="email" label="Email"/>
                <Input name="password" id="password" label="Password" value="Azerty1!"/>
                <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-min">Valider</button>
            </form>
        </Layout>
    );
}