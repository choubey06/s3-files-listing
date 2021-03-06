import React, { PureComponent } from 'react';
import AWS from 'aws-sdk';
import styles from './styles/listing.module.scss';
import LoginComponent from './components/login.component';
import ListFiles from './components/list-files.component';
import AuthService from '../services/auth/auth.service';


class ListingContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      s3Files: [],
    };
 
    this.AuthService = new AuthService();

  }

  loginHandler = async (values) => {
    const response = await this.AuthService.login(values);
    if (response?.auth === "success"){
      const awsConfig = await this.AuthService.getAWSConfig(values);
      this.getS3Files(awsConfig);
      this.setState({loggedIn: true})
    }
  };

  getS3Files = config => {
    AWS.config.update({
      accessKeyId: config?.accessKeyId,
      secretAccessKey: config?.secretAccessKey,
      region: config?.region,
  });
  const s3 = new AWS.S3();

  const params = {
      Bucket: 'dummytpcontrolbucket',
      Delimiter: '',
      Prefix: '',
  };

  s3.listObjectsV2(params, (err, data) => {
      if(err) {
          console.log(err, err.stack);
      } else {
          this.setState({s3Files: data?.Contents});
      }
  });
  };

 render() {
    const {loggedIn, s3Files} = this.state;
    return (
      <>
      { loggedIn ? (<ListFiles
      s3Files={s3Files}
      />)        
        :(
        <div className={styles.loginForm}>
        <LoginComponent
        actionHandler={this.loginHandler}
      />
      </div>
        )}
     </>
    );
  }
}

export default ListingContainer;
