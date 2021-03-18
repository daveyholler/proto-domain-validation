let domainValidation = {
  error: '',
  protocol: '',
  entryPoint: '/',
  domain: '',
}

export const parseDomain = (url: string) => {
  const regex = /(?<protocol>^https?:\/\/)(?<domain>\w{1,}.\w{2,})(?<path>.*)/g
  const match = regex.exec(url);
  // Check if the url contains a protocol
  if (match) {
    domainValidation.protocol = match.groups ? match.groups.protocol : '';
    domainValidation.entryPoint = match.groups ? match.groups.path : '/';
    domainValidation.domain = match.groups ? match.groups.domain : '';
    return domainValidation;
  } else {
    return { ...domainValidation, error: 'Please provide a protocol' };
  }
}