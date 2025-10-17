import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { BarChart3, LineChart as LineChartIcon, PieChart, Activity, Upload } from "lucide-react";
import { useState } from "react";
import { LineChart, Line, BarChart, Bar, PieChart as RechartsPieChart, Pie, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { toast } from "sonner";

type ChartType = "line" | "bar" | "pie" | "radar";

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', '#f59e0b', '#ef4444', '#8b5cf6', '#10b981', '#06b6d4'];

export default function Visualize() {
  const [csvData, setCsvData] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [xAxis, setXAxis] = useState<string>("");
  const [yAxis, setYAxis] = useState<string>("");
  const [chartType, setChartType] = useState<ChartType>("line");
  const [fileName, setFileName] = useState<string>("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n').filter(line => line.trim());
      
      if (lines.length < 2) {
        toast.error("El archivo CSV debe tener al menos una fila de datos");
        return;
      }

      const headers = lines[0].split(',').map(h => h.trim());
      setColumns(headers);
      setXAxis(headers[0]);
      setYAxis(headers[1] || headers[0]);

      const data = lines.slice(1).map(line => {
        const values = line.split(',');
        const row: any = {};
        headers.forEach((header, index) => {
          const value = values[index]?.trim();
          row[header] = isNaN(Number(value)) ? value : Number(value);
        });
        return row;
      });

      setCsvData(data);
      toast.success("Archivo CSV cargado correctamente");
    };

    reader.readAsText(file);
  };

  const renderChart = () => {
    if (csvData.length === 0 || !xAxis || !yAxis) {
      return (
        <div className="flex flex-col items-center justify-center h-[400px] text-muted-foreground">
          <BarChart3 className="h-16 w-16 mb-4 opacity-50" />
          <p>Carga un archivo CSV y selecciona los ejes para visualizar</p>
        </div>
      );
    }

    const commonProps = {
      data: csvData,
      margin: { top: 20, right: 30, left: 20, bottom: 20 }
    };

    switch (chartType) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey={xAxis} stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
              <Legend />
              <Line type="monotone" dataKey={yAxis} stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))' }} />
            </LineChart>
          </ResponsiveContainer>
        );

      case "bar":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey={xAxis} stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
              <Legend />
              <Bar dataKey={yAxis} fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      case "pie":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RechartsPieChart>
              <Pie
                data={csvData}
                dataKey={yAxis}
                nameKey={xAxis}
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {csvData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
              <Legend />
            </RechartsPieChart>
          </ResponsiveContainer>
        );

      case "radar":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart {...commonProps}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey={xAxis} stroke="hsl(var(--muted-foreground))" />
              <PolarRadiusAxis stroke="hsl(var(--muted-foreground))" />
              <Radar name={yAxis} dataKey={yAxis} stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
          Visualización de Datos
        </h1>
        <p className="mt-2 text-muted-foreground">
          Carga tu CSV y visualiza tus datos en diferentes tipos de gráficos
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Controls */}
        <Card className="lg:col-span-1 border-border/50 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-soft">
          <CardHeader>
            <CardTitle>Configuración</CardTitle>
            <CardDescription>Selecciona tus parámetros de visualización</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* File Upload */}
            <div className="space-y-2">
              <Label htmlFor="csv-upload">Cargar CSV</Label>
              <div className="flex flex-col gap-2">
                <input
                  id="csv-upload"
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  onClick={() => document.getElementById('csv-upload')?.click()}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {fileName || "Seleccionar archivo"}
                </Button>
                {fileName && (
                  <p className="text-xs text-muted-foreground">
                    {csvData.length} filas cargadas
                  </p>
                )}
              </div>
            </div>

            {/* Chart Type */}
            <div className="space-y-2">
              <Label>Tipo de Gráfico</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={chartType === "line" ? "default" : "outline"}
                  onClick={() => setChartType("line")}
                  className="w-full"
                >
                  <LineChartIcon className="mr-2 h-4 w-4" />
                  Lineal
                </Button>
                <Button
                  variant={chartType === "bar" ? "default" : "outline"}
                  onClick={() => setChartType("bar")}
                  className="w-full"
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Barras
                </Button>
                <Button
                  variant={chartType === "pie" ? "default" : "outline"}
                  onClick={() => setChartType("pie")}
                  className="w-full"
                >
                  <PieChart className="mr-2 h-4 w-4" />
                  Circular
                </Button>
                <Button
                  variant={chartType === "radar" ? "default" : "outline"}
                  onClick={() => setChartType("radar")}
                  className="w-full"
                >
                  <Activity className="mr-2 h-4 w-4" />
                  Radial
                </Button>
              </div>
            </div>

            {/* Axis Selection */}
            {columns.length > 0 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="x-axis">Eje X</Label>
                  <Select value={xAxis} onValueChange={setXAxis}>
                    <SelectTrigger id="x-axis">
                      <SelectValue placeholder="Selecciona columna" />
                    </SelectTrigger>
                    <SelectContent>
                      {columns.map((col) => (
                        <SelectItem key={col} value={col}>
                          {col}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="y-axis">Eje Y / Valores</Label>
                  <Select value={yAxis} onValueChange={setYAxis}>
                    <SelectTrigger id="y-axis">
                      <SelectValue placeholder="Selecciona columna" />
                    </SelectTrigger>
                    <SelectContent>
                      {columns.map((col) => (
                        <SelectItem key={col} value={col}>
                          {col}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Chart Display */}
        <Card className="lg:col-span-2 border-border/50 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-soft">
          <CardHeader>
            <CardTitle>Visualización</CardTitle>
            <CardDescription>
              {csvData.length > 0 
                ? `Mostrando ${chartType === "line" ? "gráfico lineal" : chartType === "bar" ? "gráfico de barras" : chartType === "pie" ? "gráfico circular" : "gráfico radial"}`
                : "Esperando datos..."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderChart()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
