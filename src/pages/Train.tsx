import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Brain, Zap, Activity } from "lucide-react";
import { toast } from "sonner";

export default function Train() {
  const [selectedDataset, setSelectedDataset] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [training, setTraining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [epochs, setEpochs] = useState([50]);

  const models = [
    { value: "random_forest", label: "Random Forest", library: "Scikit-learn" },
    { value: "svm", label: "Support Vector Machine", library: "Scikit-learn" },
    { value: "neural_net", label: "Red Neuronal", library: "PyTorch" },
    { value: "gradient_boost", label: "Gradient Boosting", library: "Scikit-learn" },
  ];

  const handleTrain = async () => {
    if (!selectedDataset || !selectedModel) {
      toast.error("Selecciona dataset y modelo");
      return;
    }

    setTraining(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTraining(false);
          toast.success("Entrenamiento completado", {
            description: "Modelo guardado exitosamente",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
          Entrenar Modelo
        </h1>
        <p className="mt-2 text-muted-foreground">
          Configura y entrena modelos con PyTorch y Scikit-learn
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Configuration */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border/50 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-soft">
            <CardHeader>
              <CardTitle>Configuración del Modelo</CardTitle>
              <CardDescription>Selecciona dataset y tipo de modelo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Dataset</Label>
                <Select value={selectedDataset} onValueChange={setSelectedDataset}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un dataset procesado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer_data_clean">customer_data_clean.csv</SelectItem>
                    <SelectItem value="sales_processed">sales_processed.csv</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Modelo</Label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un algoritmo" />
                  </SelectTrigger>
                  <SelectContent>
                    {models.map((model) => (
                      <SelectItem key={model.value} value={model.value}>
                        <div className="flex items-center gap-2">
                          <span>{model.label}</span>
                          <span className="text-xs text-muted-foreground">({model.library})</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Épocas de Entrenamiento</Label>
                  <span className="text-sm font-bold text-primary">{epochs[0]}</span>
                </div>
                <Slider
                  value={epochs}
                  onValueChange={setEpochs}
                  min={10}
                  max={200}
                  step={10}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          {training && (
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 shadow-soft animate-in fade-in slide-in-from-bottom duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  Entrenamiento en Progreso
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={progress} className="h-3" />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progreso</span>
                  <span className="font-bold text-primary">{progress}%</span>
                </div>
              </CardContent>
            </Card>
          )}

          <Button
            onClick={handleTrain}
            disabled={!selectedDataset || !selectedModel || training}
            className="w-full bg-gradient-to-r from-secondary to-emerald-400 hover:shadow-glow transition-all duration-300"
            size="lg"
          >
            {training ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Entrenando...
              </>
            ) : (
              <>
                <Brain className="mr-2 h-5 w-5" />
                Iniciar Entrenamiento
              </>
            )}
          </Button>
        </div>

        {/* Info Panel */}
        <div className="space-y-6">
          <Card className="border-border/50 bg-gradient-to-br from-card to-card/50 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Recursos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-border/50 bg-muted/30 p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">CPU</span>
                  <span className="text-sm font-bold text-foreground">45%</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
              <div className="rounded-lg border border-border/50 bg-muted/30 p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Memoria</span>
                  <span className="text-sm font-bold text-foreground">2.4 GB</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="h-5 w-5 text-accent" />
                Frameworks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-lg border border-accent/20 bg-card/50 p-3">
                <p className="text-sm font-medium text-foreground">PyTorch</p>
                <p className="text-xs text-muted-foreground">Deep Learning</p>
              </div>
              <div className="rounded-lg border border-secondary/20 bg-card/50 p-3">
                <p className="text-sm font-medium text-foreground">Scikit-learn</p>
                <p className="text-xs text-muted-foreground">Machine Learning</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-gradient-to-br from-card to-card/50 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Última Ejecución</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Accuracy</span>
                <span className="font-bold text-secondary">94.5%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Loss</span>
                <span className="font-bold text-foreground">0.0234</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tiempo</span>
                <span className="font-bold text-foreground">12m 34s</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
