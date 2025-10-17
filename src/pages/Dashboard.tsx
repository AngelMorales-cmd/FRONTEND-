import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, TrendingUp, Activity, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const stats = [
  {
    title: "Datasets Cargados",
    value: "12",
    change: "+3 este mes",
    icon: Database,
    gradient: "from-primary to-primary-glow",
  },
  {
    title: "Modelos Entrenados",
    value: "8",
    change: "+2 esta semana",
    icon: TrendingUp,
    gradient: "from-secondary to-emerald-400",
  },
  {
    title: "Accuracy Promedio",
    value: "94.5%",
    change: "+2.3% mejora",
    icon: Activity,
    gradient: "from-accent to-purple-400",
  },
  {
    title: "Procesamiento Activo",
    value: "2",
    change: "En ejecución",
    icon: Zap,
    gradient: "from-orange-500 to-red-500",
  },
];

const recentActivity = [
  { name: "customer_data.csv", action: "Limpieza completada", time: "Hace 2 horas" },
  { name: "sales_model", action: "Entrenamiento completado", time: "Hace 5 horas" },
  { name: "inventory.json", action: "Dataset cargado", time: "Hace 1 día" },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
          Dashboard ML
        </h1>
        <p className="mt-2 text-muted-foreground">
          Sistema de gestión y entrenamiento de modelos de Machine Learning
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card
            key={stat.title}
            className="relative overflow-hidden border-border/50 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`rounded-lg bg-gradient-to-br ${stat.gradient} p-2 shadow-glow`}>
                  <stat.icon className="h-4 w-4 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              <p className="mt-1 text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
        <Card className="border-border/50 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-soft">
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>Comienza tu flujo de trabajo ML</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              onClick={() => navigate("/upload")}
              className="w-full justify-start bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow transition-all duration-300"
              size="lg"
            >
              <Database className="mr-2 h-5 w-5" />
              Cargar Nuevo Dataset
            </Button>
            <Button
              onClick={() => navigate("/clean")}
              variant="secondary"
              className="w-full justify-start"
              size="lg"
            >
              <Activity className="mr-2 h-5 w-5" />
              Limpiar y Preprocesar
            </Button>
            <Button
              onClick={() => navigate("/train")}
              variant="outline"
              className="w-full justify-start border-accent/50 hover:bg-accent/10 hover:border-accent"
              size="lg"
            >
              <TrendingUp className="mr-2 h-5 w-5" />
              Entrenar Modelo
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-border/50 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-soft">
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>Últimas operaciones del sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-lg border border-border/50 bg-muted/30 p-3 transition-all hover:bg-muted/50"
                >
                  <div className="rounded-full bg-gradient-to-br from-primary to-accent p-2">
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-foreground">{activity.name}</p>
                    <p className="text-xs text-muted-foreground">{activity.action}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Technology Stack Info */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Stack Tecnológico
          </CardTitle>
          <CardDescription>Librerías de Python integradas en el backend</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {["Pandas", "NumPy", "PyTorch", "Scikit-learn"].map((tech) => (
              <div
                key={tech}
                className="rounded-lg border border-border/50 bg-card/50 p-4 text-center backdrop-blur-sm transition-all hover:scale-105 hover:border-primary/50"
              >
                <p className="font-semibold text-foreground">{tech}</p>
                <p className="mt-1 text-xs text-muted-foreground">Integrado</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
