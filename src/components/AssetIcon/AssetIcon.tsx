import styles from './AssetIcon.module.css';
import applicationTrafficInsightIcon from '../../assets/icons/application-traffic-insight.svg';
import angleDownIcon from '../../assets/icons/angle-down.svg';
import angleUpIcon from '../../assets/icons/angle-up.svg';
import avatarIcon from '../../assets/icons/avatar.svg';
import bigIpUtilitiesIcon from '../../assets/icons/big-ip-utilities.svg';
import botDefenseIcon from '../../assets/icons/bot-defense.svg';
import contentDeliveryNetworkIcon from '../../assets/icons/content-delivery-network.svg';
import ddosAndTransitServicesIcon from '../../assets/icons/ddos-and-transit-services.svg';
import dragIcon from '../../assets/icons/drag.svg';
import externalIcon from '../../assets/icons/info.svg';
import infoIcon from '../../assets/icons/question-icon.svg';
import lockIcon from '../../assets/icons/External icon.svg';
import loadBalancersIcon from '../../assets/icons/load-balancers.svg';
import nginxOneIcon from '../../assets/icons/nginx-one.svg';
import moreIcon from '../../assets/icons/more.svg';
import aiLogoIcon from '../../assets/icons/ai-logo.svg';
import helpIcon from '../../assets/icons/m.svg';
import trashIcon from '../../assets/icons/trash.svg';
import webAppAndApiProtectionIcon from '../../assets/icons/web-app-and-api-protection.svg';
import webAppScanningIcon from '../../assets/icons/web-app-scanning.svg';

const icons = {
  'application-traffic-insight': applicationTrafficInsightIcon,
  'angle-down': angleDownIcon,
  'angle-up': angleUpIcon,
  avatar: avatarIcon,
  'big-ip-utilities': bigIpUtilitiesIcon,
  'bot-defense': botDefenseIcon,
  'bot-defense-recent': botDefenseIcon,
  'content-delivery-network': contentDeliveryNetworkIcon,
  'ddos-and-transit-services': ddosAndTransitServicesIcon,
  drag: dragIcon,
  external: externalIcon,
  info: infoIcon,
  'help-buoy': helpIcon,
  lock: lockIcon,
  'load-balancers': loadBalancersIcon,
  more: moreIcon,
  'nginx-one': nginxOneIcon,
  recent: botDefenseIcon,
  'support-ai-logo': aiLogoIcon,
  trash: trashIcon,
  'web-app-and-api-protection': webAppAndApiProtectionIcon,
  'web-app-scanning': webAppScanningIcon,
};

export type AssetIconName = keyof typeof icons;

export function AssetIcon({ name, size = 40 }: { name: AssetIconName; size?: number }) {
  return (
    <img
      className={styles.icon}
      src={icons[name]}
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      data-icon={name}
    />
  );
}
