import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Trash2, TrendingUp } from "lucide-react";
import { toast } from "sonner";

export default function Clean() {
  const [selectedDataset, setSelectedDataset] = useState("");
  const [processing, setProcessing] = useState(false);

  const cleaningOptions = [
    { id: "nulls", label: "Eliminar valores nulos", description: "Filas con datos faltantes" },
    { id: "duplicates", label: "Eliminar duplicados", description: "Registros repetidos" },
    { id: "outliers", label: "Detectar outliers", description: "Valores atípicos estadísticos" },
    { id: "normalize", label: "Normalizar datos", description: "Escalado 0-1 con MinMaxScaler" },
    { id: "standardize", label: "Estandarizar datos", description: "Media 0, desviación 1" },
  ];

  const handleClean = async () => {
    if (!selectedDataset) {
      toast.error("Selecciona un dataset primero");
      return;
    }

    setProcessing(true);
    // Simulación de procesamiento
    setTimeout(() => {
      setProcessing(false);
      toast.success("Limpieza completada", {
        description: "Dataset procesado con pandas y NumPy",
      });
    }, 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
          Limpieza de Datos
        </h1>
        <p className="mt-2 text-muted-foreground">
          Preprocesamiento y transformación con pandas y NumPy
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Configuration */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border/50 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-soft">
            <CardHeader>
              <CardTitle>Seleccionar Dataset</CardTitle>
              <CardDescription>Elige el conjunto de datos a procesar</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedDataset} onValueChange={setSelectedDataset}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un dataset" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer_data.csv">customer_data.csv</SelectItem>
                  <SelectItem value="sales_records.csv">sales_records.csv</SelectItem>
                  <SelectItem value="inventory.json">inventory.json</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-soft">
            <CardHeader>
              <CardTitle>Opciones de Limpieza</CardTitle>
              <CardDescription>Selecciona las operaciones a realizar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {cleaningOptions.map((option) => (
                <div key={option.id} className="flex items-start space-x-3 rounded-lg border border-border/50 bg-muted/30 p-4">
                  <Checkbox id={option.id} className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor={option.id} className="font-medium cursor-pointer">
                      {option.label}
                    </Label>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Button
            onClick={handleClean}
            disabled={!selectedDataset || processing}
            className="w-full bg-gradient-to-r from-accent to-purple-500 hover:shadow-glow transition-all duration-300"
            size="lg"
          >
            {processing ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Procesando con pandas...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Ejecutar Limpieza
              </>
            )}
          </Button>
        </div>

        {/* Info Panel */}
        <div className="space-y-6">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Vista Previa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Filas totales</span>
                  <span className="font-bold text-foreground">1,234</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Columnas</span>
                  <span className="font-bold text-foreground">15</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Valores nulos</span>
                  <span className="font-bold text-destructive">234</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Duplicados</span>
                  <span className="font-bold text-destructive">12</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-gradient-to-br from-card to-card/50 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-secondary" />
                Librerías
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-lg border border-secondary/20 bg-secondary/5 p-3">
                <p className="text-sm font-medium text-foreground">pandas</p>
                <p className="text-xs text-muted-foreground">Manipulación de datos</p>
              </div>
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
                <p className="text-sm font-medium text-foreground">NumPy</p>
                <p className="text-xs text-muted-foreground">Operaciones numéricas</p>
              </div>
              <div className="rounded-lg border border-accent/20 bg-accent/5 p-3">
                <p className="text-sm font-medium text-foreground">Scikit-learn</p>
                <p className="text-xs text-muted-foreground">Normalización y escalado</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
