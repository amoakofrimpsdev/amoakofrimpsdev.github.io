import Link from "next/link";
import { ArrowLeft } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="wrap grid min-h-[70svh] place-items-center py-24 text-center">
      <div>
        <div className="label">Error 404</div>
        <h1 className="display mt-5 text-[clamp(3rem,10vw,7rem)]">
          Nothing <em>here.</em>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-lg text-ink-2">
          That page does not exist, or it moved when I rebuilt the site.
        </p>
        <Link href="/" className="btn btn-solid mt-9">
          <ArrowLeft /> Back to the home page
        </Link>
      </div>
    </section>
  );
}
