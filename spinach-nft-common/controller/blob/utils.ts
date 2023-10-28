import {AzureBlobControlOpts} from '@spinach/common/controller/blob/type';


export const enforceAzureBlobNaming = ({container, name}: AzureBlobControlOpts): AzureBlobControlOpts => ({
  container: container.toLowerCase(),
  name: name.toLowerCase(),
});
