import React, { useContext, useEffect, useState } from 'react';
import { getCookie, LoadingContext, setCookie } from '../../../utils';
import CreationPresenter from './CreationPresenter';
import { Content } from '../Workspace/WorkspaceContainer';
import { useNavigate, useParams } from 'react-router-dom';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
import { SessionContext } from '../../../utils/SessionManager';
import ContentApi from '../../../api/ContentApi';

type Props = {};

const CreationContainer = (props: Props) => {
  const { eventLoading } = useContext(LoadingContext);
  const { isLogin, content, setContent } = useContext(SessionContext);
  /* Router */
  const { content_id } = useParams();
  const navigation = useNavigate();
  /* State */
  const [editContent, setEditContent] = useState();
  /* Functions */
  const handleSave = async (d: any) => {
    eventLoading();
    const { event_list, file, thumbnail } = d;
    const data: Content = {
      ...content,
      event_list: event_list,
      thumbnail: thumbnail,
      file: file,
    };

    const postData = {
      content_id,
      event_list: JSON.stringify(event_list),
      content_width: d.content_width,
      content_height: d.content_height,
    };
    const result = await ContentApi.updateContent(postData);
    if (result) {
      setContent(data);

      handlePng(data);
    }
    setContent(data);
  };

  const handlePng = (data: any) => {
    const temp = getCookie('ttdd');
    if (temp) {
      const d = JSON.parse(temp);
      setCookie('ttdd', d);
      return;
    }

    setCookie('ttdd', [JSON.stringify(data)]);
  };

  /* Hooks */
  useEffect(() => {
    if (!content_id) {
      return;
    }
    // const [dd] = content.filter((item: Content) => {
    //   const { content_id: temp_id } = item;
    //   return content_id === temp_id;
    // });
    const { event_list } = content;
    setEditContent(event_list);
  }, [content_id]);

  useEffect(() => {
    if (isLogin) {
      return;
    }
    navigation('/auth');
  }, [isLogin]);

  /* Render */
  return <CreationPresenter save={handleSave} content={editContent} />;
};

export default CreationContainer;
