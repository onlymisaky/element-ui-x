import { markInstall, autoInstall } from 'packages/utils/index';
import Button from './Button.vue';

const ElxButton = markInstall(Button);

autoInstall(ElxButton.install);

export default ElxButton;
