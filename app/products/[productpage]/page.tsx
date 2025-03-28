import { Productdetale } from "@/app/components/productdetale/Productdetale";
import { Productcarusel } from "@/app/components/productcarusel/Productcarusel";
import { Providers } from "@/app/providers";

export default function Productpage() {
  return (
    <div className="mt-40">
      <Providers>
        <div className="content">
          <Productdetale />
          <div className="w-full">
            <Productcarusel />
          </div>
        </div>
      </Providers>
    </div>
  );
}
