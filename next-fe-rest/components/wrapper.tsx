type Props = {
  children: React.ReactNode;
};

export const Wrapper = ({ children }: Props) => {
  return (
    <div className="w-full transform -translate-y-10">
      <div className="max-w-screen-2xl mx-auto">
        <div className="bg-white mx-6 rounded-xl px-6 py-8 shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
};
