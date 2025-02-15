import { type FC } from "react";

export const FooterElement: FC = () => {
  return (
    <footer className="w-full bg-background mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="mt-8 pt-8 border-t">
            <p className="text-sm text-muted-foreground text-center">
              © {new Date().getFullYear()} TaskMaster. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
