import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload as UploadIcon, FileJson, FileText, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Por favor selecciona un archivo");
      return;
    }

    setUploading(true);
    // Simulación de carga
    setTimeout(() => {
      setUploading(false);
      toast.success("Archivo cargado exitosamente", {
        description: `${file.name} está listo para procesamiento`,
      });
      setFile(null);
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Cargar Datos
        </h1>
        <p className="mt-2 text-muted-foreground">
          Sube tus datasets en formato CSV o JSON para procesamiento
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upload Card */}
        <Card className="border-border/50 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-soft">
          <CardHeader>
            <CardTitle>Seleccionar Archivo</CardTitle>
            <CardDescription>Formatos soportados: CSV, JSON</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="file">Archivo de Datos</Label>
              <Input
                id="file"
                type="file"
                accept=".csv,.json"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
            </div>

            {file && (
              <div className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
                {file.name.endsWith('.json') ? (
                  <FileJson className="h-8 w-8 text-primary" />
                ) : (
                  <FileText className="h-8 w-8 text-primary" />
                )}
                <div className="flex-1">
                  <p className="font-medium text-foreground">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
            )}

            <Button
              onClick={handleUpload}
              disabled={!file || uploading}
              className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-glow transition-all duration-300"
              size="lg"
            >
              {uploading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Cargando...
                </>
              ) : (
                <>
                  <UploadIcon className="mr-2 h-5 w-5" />
                  Cargar Dataset
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="border-border/50 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-soft">
          <CardHeader>
            <CardTitle>Proceso de Carga</CardTitle>
            <CardDescription>Qué sucede al cargar tus datos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-glow">
                <span className="text-sm font-bold text-white">1</span>
              </div>
              <div>
                <p className="font-medium text-foreground">Validación del Archivo</p>
                <p className="text-sm text-muted-foreground">
                  Se verifica el formato y estructura
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-purple-500">
                <span className="text-sm font-bold text-white">2</span>
              </div>
              <div>
                <p className="font-medium text-foreground">Transferencia Segura</p>
                <p className="text-sm text-muted-foreground">
                  Datos enviados al backend encriptados
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-secondary to-emerald-400">
                <span className="text-sm font-bold text-white">3</span>
              </div>
              <div>
                <p className="font-medium text-foreground">Almacenamiento</p>
                <p className="text-sm text-muted-foreground">
                  Se guarda en la base de datos externa
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-lg border border-secondary/20 bg-secondary/5 p-4">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Pandas & NumPy</p>
                  <p className="text-sm text-muted-foreground">
                    El backend procesará automáticamente con pandas y NumPy para análisis inicial
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
