import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, User } from 'lucide-react';
import { toast } from 'sonner';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Simulate API call and role assignment
        if (username === 'admin' && password === 'admin') {
            login('admin');
            toast.success('Sesión iniciada como Admin Central');
            navigate('/');
        } else if (username === 'demo' && password === 'demo') {
            login('distributor');
            toast.success('Sesión iniciada como Distribuidor');
            navigate('/');
        } else if (username === 'colab' && password === 'colab') {
            login('collaborator');
            toast.success('Sesión iniciada como Colaborador');
            navigate('/');
        } else {
            toast.error('Credenciales incorrectas');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
            <div className="w-full max-w-md space-y-8 animate-fade-in">
                <div className="text-center space-y-2">
                    <img src="/logo.png" alt="Multicentros Logo" className="w-32 h-32 object-contain mx-auto mb-4" />
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        Multicentros CRM
                    </h1>
                    <p className="text-muted-foreground">
                        Accede a tu panel de distribuidor
                    </p>
                </div>

                <div className="bg-card p-8 rounded-xl border border-border shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">Usuario</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    id="username"
                                    placeholder="demo"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="demo"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        <Button type="submit" className="w-full h-11 text-base">
                            Iniciar Sesión
                        </Button>
                    </form>

                    <div className="mt-6 p-4 bg-muted/50 rounded-lg text-sm text-center text-muted-foreground space-y-2">
                        <p className="font-medium">Credenciales de prueba:</p>
                        <div className="flex justify-center gap-2 flex-wrap">
                            <div className="space-x-2">
                                <span className="text-xs font-semibold">Dist:</span>
                                <code className="bg-background px-2 py-1 rounded border">demo</code>
                            </div>
                            <div className="space-x-2">
                                <span className="text-xs font-semibold">Colab:</span>
                                <code className="bg-background px-2 py-1 rounded border">colab</code>
                            </div>
                            <div className="space-x-2">
                                <span className="text-xs font-semibold">Admin:</span>
                                <code className="bg-background px-2 py-1 rounded border">admin</code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
