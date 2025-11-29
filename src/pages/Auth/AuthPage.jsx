import React from "react";

function AuthPage({children}) {
  return (
    <div className="flex min-h-screen bg-muted dark:bg-background text-foreground">

      {/* Left Banner — persistent */}
      <div className="hidden lg:flex w-1/2 items-center justify-center relative">
        <img
          src="/images/loginScreenimg.webp"
          alt="Auth Visual"
          className="object-cover w-full h-full"
        />
    
      </div>

      {/* Right Side — dynamic outlet */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-6 sm:p-12">
      {children}
      </div>

    </div>
  );
}

export default AuthPage;
