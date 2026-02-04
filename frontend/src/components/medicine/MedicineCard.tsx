import { Pill, Building2, AlertCircle, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MedicineDetails } from "@/lib/api";

interface MedicineCardProps {
  medicine: MedicineDetails;
  ocrResult?: string;
}

export function MedicineCard({ medicine, ocrResult }: MedicineCardProps) {
  return (
    <div className="animate-slide-up space-y-4">
      {/* OCR Result */}
      {ocrResult && (
        <Card className="shadow-soft border-accent/30 bg-accent/5">
          <CardContent className="flex items-start gap-3 pt-6">
            <FileText className="h-5 w-5 shrink-0 text-accent" />
            <div>
              <p className="font-medium text-foreground">Detected Text (OCR)</p>
              <p className="mt-1 text-sm text-muted-foreground">{ocrResult}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Medicine Details */}
      <Card className="shadow-card overflow-hidden">
        <CardHeader className="bg-accent/5 border-b border-accent/10">
          <CardTitle className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
              <Pill className="h-6 w-6 text-accent" />
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground">Medicine</span>
              <p className="text-xl font-bold text-foreground">{medicine.name}</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          {/* Description */}
          {medicine.description && (
            <div>
              <h4 className="mb-2 text-sm font-semibold text-foreground">Description</h4>
              <p className="text-muted-foreground">{medicine.description}</p>
            </div>
          )}

          {/* Usage */}
          {medicine.usage && (
            <div>
              <h4 className="mb-2 text-sm font-semibold text-foreground">How to Use</h4>
              <p className="text-muted-foreground">{medicine.usage}</p>
            </div>
          )}

          {/* Manufacturer */}
          {medicine.manufacturer && (
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Manufactured by: <span className="font-medium text-foreground">{medicine.manufacturer}</span>
              </span>
            </div>
          )}

          {/* Side Effects */}
          {medicine.sideEffects && medicine.sideEffects.length > 0 && (
            <div>
              <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                <AlertCircle className="h-4 w-4 text-warning" />
                Possible Side Effects
              </h4>
              <div className="flex flex-wrap gap-2">
                {medicine.sideEffects.map((effect, index) => (
                  <Badge key={index} variant="outline" className="border-warning/30 text-muted-foreground">
                    {effect}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
