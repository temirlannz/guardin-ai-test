import { Toaster as Sonner, type ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme='light'
      className="toaster group"
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
        } as React.CSSProperties
      }
      toastOptions={{
        className: 'rounded-full',
        classNames: {
          // 👇 per-variant overrides
          success: 'rounded-full',
          error: 'rounded-full',
          warning: 'rounded-full',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
