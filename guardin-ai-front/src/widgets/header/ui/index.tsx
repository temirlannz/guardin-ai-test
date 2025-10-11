import {Container} from "@/shared/ui/layout/container";
import {ActionButtons} from "@/widgets/header/ui/action-buttons";
import {Logo} from "@/widgets/header/ui/logo";


export const Header = () => {
  return (
    <header>
      <Container>
        <div className="flex items-center justify-between my-4 rounded-full px-4">
            <Logo width={40} height={40} />
            <ActionButtons />
        </div>
      </Container>
    </header>
  );
};
